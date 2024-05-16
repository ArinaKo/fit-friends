import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getUserDataAvatar,
  getUserDataDescription,
  getUserDataIsReady,
  getUserDataLevel,
  getUserDataLocation,
  getUserDataName,
  getUserDataSex,
  getUserDataWorkoutTypes,
  isUserDataEditing,
  isUserFormDataSending,
  isUserFormHaveErrors,
  setUserEditingStatus,
} from '../../store';
import {
  AvatarInput,
  SelectInput,
  SelectInputType,
  StatusInput,
  StatusInputMode,
  TextAreaInput,
  TextAreaInputType,
  CustomInput,
  CustomInputType,
  WorkoutTypesInput,
} from '../form-inputs';
import { updateUserAction } from '../../store/api-actions';
import { getFileUrl } from '../../utils';

const inputStyleClass = 'user-info-edit';

function EditUserForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getUserDataAvatar);
  const name = useAppSelector(getUserDataName);
  const sex = useAppSelector(getUserDataSex);
  const isReady = useAppSelector(getUserDataIsReady);
  const location = useAppSelector(getUserDataLocation);
  const level = useAppSelector(getUserDataLevel);
  const workoutTypes = useAppSelector(getUserDataWorkoutTypes);
  const description = useAppSelector(getUserDataDescription);
  const isSending = useAppSelector(isUserFormDataSending);
  const isFormHaveError = useAppSelector(isUserFormHaveErrors);
  const isEdited = useAppSelector(isUserDataEditing);

  const [file, setFile] = useState<Blob | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (!isEdited) {
      dispatch(setUserEditingStatus(true));
      return;
    }
    if (!isFormHaveError) {
      dispatch(updateUserAction({ avatar: file ? file : undefined }));
    }
  };

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <AvatarInput
          setFile={setFile}
          originalValue={avatar ? getFileUrl(avatar) : undefined}
          isActive={isEdited}
          withControls
        />
      </div>
      <form
        className="user-info-edit__form"
        method="post"
        onSubmit={handleFormSubmit}
      >
        <button
          className="btn-flat btn-flat--underlined user-info-edit__save-button"
          type="submit"
          aria-label={isEdited ? 'Сохранить' : 'Редактировать'}
          disabled={isSending}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>{isEdited ? 'Сохранить' : 'Редактировать'}</span>
        </button>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <CustomInput
            type={CustomInputType.Name}
            styleClass={inputStyleClass}
            originalValue={name}
            isActive={isEdited}
          />
          <TextAreaInput
            type={TextAreaInputType.UserDescription}
            originalValue={description}
            isActive={isEdited}
          />
        </div>
        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">
            Статус
          </h2>
          <StatusInput
            mode={StatusInputMode.Account}
            isActive={isEdited}
            originalValue={isReady}
          />
        </div>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">
            Специализация
          </h2>
          <WorkoutTypesInput
            styleClass={inputStyleClass}
            isActive={isEdited}
            originalValue={workoutTypes}
          />
        </div>
        <SelectInput
          type={SelectInputType.Location}
          styleClass={inputStyleClass}
          isActive={isEdited}
          originalValue={location}
        />
        <SelectInput
          type={SelectInputType.Sex}
          styleClass={inputStyleClass}
          isActive={isEdited}
          originalValue={sex}
        />
        <SelectInput
          type={SelectInputType.Level}
          styleClass={inputStyleClass}
          isActive={isEdited}
          originalValue={level}
        />
      </form>
    </section>
  );
}

export default EditUserForm;
