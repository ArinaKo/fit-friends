import { REQUIRED_INPUT_MESSAGE } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getUserFormCertificatesAmount,
  getUserFormCertificatesError,
  isUserFormDataSending,
  setCertificatesAmount,
  setUserFormError,
} from '../../../store';

type CertificateInputProps = {
  setFiles: (files: File[]) => void;
};

function CertificatesInput({ setFiles }: CertificateInputProps): JSX.Element {
  const dispatch = useAppDispatch();
  const certificatesAmount = useAppSelector(getUserFormCertificatesAmount);
  const certificatesError = useAppSelector(getUserFormCertificatesError);
  const isDisabled = useAppSelector(isUserFormDataSending);

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files) {
      dispatch(setUserFormError(['certificate', REQUIRED_INPUT_MESSAGE]));
      return;
    }
    const files = Array.from(evt.target.files);

    setFiles(files);
    dispatch(setCertificatesAmount(files.length));
    dispatch(setUserFormError(['certificatesAmount', undefined]));
  }

  function getInputText(): string {
    if (certificatesError) {
      return certificatesError;
    }
    if (!certificatesAmount) {
      return 'Загрузите сюда файлы формата PDF, JPG или PNG';
    }
    if (certificatesAmount === 1) {
      return 'Загружен 1 сертификат';
    }
    return certificatesAmount < 5
      ? `Загружено ${certificatesAmount} сертификата`
      : `Загружено ${certificatesAmount} сертификатов`;
  }

  return (
    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
      <label>
        <span className="drag-and-drop__label" tabIndex={0}>
          {getInputText()}
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref="#icon-import" />
          </svg>
        </span>
        <input
          type="file"
          name="certificates"
          tabIndex={-1}
          accept=".pdf"
          // accept=".pdf, .jpg, .png"
          multiple
          disabled={isDisabled}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default CertificatesInput;
