import Book from '../bucharitesh/book';

const BookDemo = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-10 rounded-xl bg-white p-6">
      <Book title="The user experience of the Frontend Cloud" />
    </div>
  );
};

export default BookDemo;
