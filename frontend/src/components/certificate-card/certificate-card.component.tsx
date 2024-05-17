import { useEffect, useRef, useState } from 'react';
import { FileData } from '../../types';
import { getFileUrl } from '../../utils';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import {
  deleteCertificateAction,
  updateCertificateAction,
} from '../../store/api-actions';

type CertificateProps = {
  certificate: FileData;
  isActive: boolean;
  setActive: (id: string | null) => void;
};

function CertificateCard({
  certificate,
  isActive,
  setActive,
}: CertificateProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const [toDelete, setToDelete] = useState(false);
  const [newCertificate, setCertificate] = useState<Blob | null>(null);

  useEffect(() => {
    if (!isActive) {
      setToDelete(false);
      setCertificate(null);
    }
  }, [isActive]);

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files) {
      return;
    }
    setCertificate(evt.target.files[0]);
    setToDelete(false);
  }

  function handleEditButtonClick(evt: React.MouseEvent) {
    evt.preventDefault();
    if (newCertificate) {
      dispatch(
        updateCertificateAction({
          certificateId: certificate.id,
          newCertificate,
        }),
      );
    }
    if (toDelete) {
      dispatch(deleteCertificateAction(certificate.id));
    }
    setActive(null);
  }

  return (
    <div
      className={cn('certificate-card', {
        'certificate-card--edit': isActive,
      })}
    >
      <div className="certificate-card__image">
        {toDelete ? (
          <span>Сертификат удален</span>
        ) : (
          <iframe
            src={`${
              newCertificate
                ? URL.createObjectURL(newCertificate)
                : getFileUrl(certificate)
            }#toolbar=0&nopageaction=1&nozoom=1&nosidebar=1&navpanes=0&statusbar=0&view=fit`}
            width="auto"
            height="100%"
          />
        )}
      </div>
      <div className="certificate-card__buttons">
        {isActive ? (
          <>
            <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
              type="button"
              onClick={handleEditButtonClick}
            >
              <svg width={12} height={12} aria-hidden="true">
                <use xlinkHref="#icon-edit" />
              </svg>
              <span>Сохранить</span>
            </button>
            <div className="certificate-card__controls">
              <input
                className="visually-hidden"
                type="file"
                accept="application/pdf"
                ref={fileInput}
                onChange={handleFileChange}
              />
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="обновить"
                onClick={() => fileInput.current?.click()}
              >
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-change" />
                </svg>
              </button>
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="удалить"
                onClick={() => {
                  setToDelete(true);
                  setCertificate(null);
                }}
              >
                <svg width={14} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-trash" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
            type="button"
            onClick={() => setActive(certificate.id)}
          >
            <svg width={12} height={12} aria-hidden="true">
              <use xlinkHref="#icon-edit" />
            </svg>
            <span>Изменить</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default CertificateCard;
