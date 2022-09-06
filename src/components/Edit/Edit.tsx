import ReactDom from 'react-dom';

export default function Edit() {
  return ReactDom.createPortal(
    <div>
      edit
    </div>,
    document.getElementById('modal')!
  );
}
