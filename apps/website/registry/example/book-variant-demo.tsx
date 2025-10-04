import { Leaf } from 'lucide-react';
import Book from '../bucharitesh/book';

const BookDemo = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-8 rounded-xl bg-white p-6 md:grid-cols-2">
      <Book title="The user experience of the Frontend Cloud" />
      <Book
        title="The user experience of the Frontend Cloud"
        variant="simple"
        width={196}
      />
      <Book
        color="#9D2127"
        title="How Vercel improves your website's search engine ranking"
        enableTexture={true}
      />
      <Book
        color="#7DC1C1"
        textColor="white"
        title="Design Engineering at Vercel"
        variant="simple"
        enableTexture={true}
      />
      <Book color="#FED954" title="The user experience of the Frontend Cloud" />
      <Book
        illustration={
          <svg
            fill="none"
            height="149"
            viewBox="0 0 197 149"
            width="197"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="#FED954" height="149" width="197" />
            <path
              d="M147 48.4995H172C185.531 48.4995 196.5 59.4685 196.5 72.9995V148.427"
              stroke="#ECAF14"
            />
            <path
              d="M0 48.5H24.5C38.031 48.5 49 37.531 49 24V0"
              stroke="#ECAF14"
            />
            <path
              d="M147.5 48.5H172C185.531 48.5 196.5 37.531 196.5 24V0"
              stroke="#ECAF14"
            />
            <path
              d="M0 48.5H24.5C38.031 48.5 49 59.469 49 73V98"
              stroke="#ECAF14"
            />
            <path
              d="M146 48.5H73.5C59.969 48.5 49 37.531 49 24V0"
              stroke="#ECAF14"
            />
            <path
              d="M196 48.5H122.5C108.969 48.5 98 37.531 98 24V0"
              stroke="#ECAF14"
            />
            <path
              d="M97 48.5H73.5C59.969 48.5 49 59.469 49 73V99.5"
              stroke="#ECAF14"
            />
            <path
              d="M98 132.5H122.5C136.031 132.5 147 121.531 147 108V98.9512"
              stroke="#ECAF14"
            />
            <path
              d="M196 132.5H171.5C157.969 132.5 147 121.531 147 108V48.5"
              stroke="#ECAF14"
            />
            <path
              d="M147 48.5H122.5C108.969 48.5 98 59.469 98 73V132"
              stroke="#ECAF14"
            />
            <path
              d="M98 132.5H73.5C59.969 132.5 49 121.531 49 108V98.9512"
              stroke="#ECAF14"
            />
          </svg>
        }
        title="The user experience of the Frontend Cloud"
      />
      <Book
        illustration={<Leaf />}
        title="The user experience of the Frontend Cloud"
        variant="simple"
      />
    </div>
  );
};

export default BookDemo;
