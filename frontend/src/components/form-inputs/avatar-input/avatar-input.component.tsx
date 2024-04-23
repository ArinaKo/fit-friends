import { AvatarMaxSize, REQUIRED_INPUT_MESSAGE } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormAvatar,
  isUserFormDataSending,
  setAvatar,
  setUserFormError,
} from '../../../store';

type AvatarInputProps = {
  setFile: (file: File) => void;
};

function AvatarInput({ setFile }: AvatarInputProps): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getUserFormAvatar);
  const isDisabled = useAppSelector(isUserFormDataSending);

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files) {
      dispatch(setUserFormError(['avatar', REQUIRED_INPUT_MESSAGE]));
      return;
    }
    const file = evt.target.files[0];

    if (file.size > AvatarMaxSize.ToCheck) {
      dispatch(
        setUserFormError([
          'avatar',
          `Максимально допустимый размер файла ${AvatarMaxSize.ForHuman}`,
        ])
      );
      return;
    }
    setFile(file);
    dispatch(setAvatar(URL.createObjectURL(file)));
    dispatch(setUserFormError(['avatar', undefined]));
  }

  return (
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file"
          accept="image/png, image/jpeg"
          required
          disabled={isDisabled}
          onChange={handleFileChange}
        />
        {avatar ? (
          <img
            className="input-load-avatar__avatar"
            src={avatar}
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
        )}
      </label>
    </div>
  );
}

export default AvatarInput;
