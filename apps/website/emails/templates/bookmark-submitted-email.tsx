// import { USER } from '@/config/user';
// import { Heading, Link, Text } from '@react-email/components';
// import EmailBody from '../components/email-body';
// import EmailText from '../components/email-text';

// export default function BookMarkSubmittedEmail({
//   url = 'https://example.com',
//   email = USER.email,
//   type = 'Other',
// }: {
//   url: string;
//   email: string;
//   type?: string;
// }) {
//   return (
//     <EmailBody>
//       <Heading className="mx-0 my-7 p-0 text-center font-semibold text-red-300 text-xl">
//         New Bookmark Submitted
//       </Heading>

//       <EmailText>
//         A new bookmark has been submitted to your collection!
//       </EmailText>

//       <div className="my-6 rounded-lg border border-[#44403c] bg-[#44403c] p-4">
//         <EmailText>
//           <strong>URL:</strong>{' '}
//           <Link
//             href={url}
//             className="text-red-100 underline underline-offset-2"
//           >
//             {url}
//           </Link>
//         </EmailText>

//         <EmailText>
//           <strong>Submitted by:</strong> {email}
//         </EmailText>

//         {type && type !== '' && (
//           <EmailText>
//             <strong>Type:</strong> {type}
//           </EmailText>
//         )}

//         <EmailText>
//           <strong>Submitted at:</strong> {new Date().toLocaleString()}
//         </EmailText>
//       </div>

//       <EmailText>
//         Review this bookmark and consider adding it to your public collection if
//         it's valuable content worth sharing.
//       </EmailText>

//       <Text className="mt-4 text-gray-200 text-xs italic">
//         P.S. Another gem for your digital treasure chest! 💎
//       </Text>
//     </EmailBody>
//   );
// }
