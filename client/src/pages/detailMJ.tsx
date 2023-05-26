import React from 'react';

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

const DetailPage: React.FC<Props>= ({ loggedID, setLoggedID }) => {
  return (
    <div className={ "page-not-found" }>
      Detail 😭
    </div>
  );
}

export default DetailPage;