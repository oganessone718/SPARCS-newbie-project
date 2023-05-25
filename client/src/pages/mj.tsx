import React from 'react';

interface Props {
  loggedID: string | null;
  setLoggedID: React.Dispatch<React.SetStateAction<string | null>>;
}

const MJPage: React.FC<Props>= ({ loggedID, setLoggedID }) => {
  return (
    <div className={ "page-not-found" }>
      mj 😭
    </div>
  );
}

export default MJPage;