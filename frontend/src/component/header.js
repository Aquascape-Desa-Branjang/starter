import React from 'react';

const Header = ({ pageName, databaseName, notifications }) => {
  return (
    <header className="bg-gray-200 shadow p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">{pageName}</h1>
        <p className="text-sm text-gray-600">{databaseName}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Notification</span>
        <div className="bg-black text-white px-2 py-1 rounded-full">
          {notifications}
        </div>
      </div>
    </header>
  );
};

export default Header;