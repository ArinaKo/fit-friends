import { FileData } from '../../types';
import { getFileUrl } from '../../utils';

type CertificateProps = {
  file: FileData;
};

function Certificate({ file }: CertificateProps): JSX.Element {
  return (
    <li className="popup__slide">
      <div className="popup__slide-img">
        <iframe
          src={`${getFileUrl(
            file,
          )}#toolbar=0&nopageaction=1&nozoom=1&nosidebar=1&navpanes=0&statusbar=0&view=fit`}
          width="auto"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </li>
  );
}

export default Certificate;
