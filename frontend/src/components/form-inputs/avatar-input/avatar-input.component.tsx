import { useEffect, useRef } from 'react';
import { AvatarMaxSize } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormAvatar,
  isUserFormDataSending,
  setAvatar,
  setUserFormError,
} from '../../../store';

type AvatarInputProps = {
  setFile: (file: File | null) => void;
  withControls?: boolean;
  originalValue?: string;
  isActive?: boolean;
};

function AvatarInput({
  setFile,
  withControls = false,
  originalValue,
  isActive = true,
}: AvatarInputProps): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getUserFormAvatar);
  const isDisabled = useAppSelector(isUserFormDataSending);

  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (originalValue && isActive) {
      dispatch(setAvatar(originalValue));
    }
  }, [dispatch, isActive, originalValue]);

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files) {
      setFile(null);
      dispatch(setAvatar(undefined));
      return;
    }
    const file = evt.target.files[0];

    if (file.size > AvatarMaxSize.ToCheck) {
      dispatch(
        setUserFormError([
          'avatar',
          `Максимально допустимый размер файла ${AvatarMaxSize.ForHuman}`,
        ]),
      );
      return;
    }
    setFile(file);
    dispatch(setAvatar(URL.createObjectURL(file)));
    dispatch(setUserFormError(['avatar', undefined]));
  }

  function handleDeleteButtonClick() {
    setFile(null);
    dispatch(setAvatar(undefined));
  }

  const getImageBlock = () => {
    const imagePath = !isActive ? originalValue : avatar;
    return imagePath ? (
      <img
        className="input-load-avatar__avatar"
        src={imagePath}
        width="98"
        height="98"
        alt="user photo"
      />
    ) : (
      <span className="input-load-avatar__btn">
        <svg width={20} height={20} aria-hidden="true">
          <use xlinkHref="#icon-import" />
        </svg>
      </span>
    );
  };

  return (
    <>
      <div className="input-load-avatar">
        <label>
          <input
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            required
            ref={fileInput}
            disabled={isDisabled || !isActive}
            onChange={handleFileChange}
          />
          {getImageBlock()}
        </label>
      </div>
      {withControls && isActive ? (
        <div className="user-info-edit__controls">
          <button
            className="user-info-edit__control-btn"
            aria-label="обновить"
            disabled={isDisabled || !isActive}
            onClick={() => fileInput.current?.click()}
          >
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-change" />
            </svg>
          </button>
          <button
            className="user-info-edit__control-btn"
            aria-label="удалить"
            disabled={isDisabled || !isActive}
            onClick={handleDeleteButtonClick}
          >
            <svg width={14} height={16} aria-hidden="true">
              <use xlinkHref="#icon-trash" />
            </svg>
          </button>
        </div>
      ) : undefined}
    </>
  );
}

export default AvatarInput;
