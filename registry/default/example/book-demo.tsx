import React from "react";
import Book from "../bucharitesh/book/book";

const BookDemo = () => {
  return (
    <div className="w-full p-6 grid grid-cols-3 gap-10 bg-white rounded-xl">
      <Book title="The user experience of the Frontend Cloud" />
    </div>
  );
};

export default BookDemo;
