import { Helmet } from 'react-helmet-async';
import DocumentView from "../../admin/sections/document/view/document-view"

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Document | Minimal UI </title>
      </Helmet>

      <DocumentView />
    </>
  );
}