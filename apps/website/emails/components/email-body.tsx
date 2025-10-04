// import { USER } from '@/config/user';
// import {
//   Body,
//   Container,
//   Head,
//   Html,
//   Img,
//   Preview,
//   Section,
//   Tailwind,
// } from '@react-email/components';
// import Footer from './footer';

// export default function EmailBody({
//   email,
//   marketing = false,
//   children,
// }: {
//   email?: string;
//   marketing?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <Html>
//       <Head />
//       <Preview>Welcome to Bucharitesh.in</Preview>
//       <Tailwind>
//         <Body className="mx-auto my-auto bg-white font-sans text-white">
//           <Container className="relative z-20 mx-auto my-10 max-w-[500px] overflow-hidden rounded-sm border border-gray-200 border-solid bg-[#1c1917] px-10 py-5">
//             {/* <div className="pointer-events-none h-full w-full top-0 left-0 absolute overflow-hidden -z-10">
//               <div className="h-full bg-[url('https://res.cloudinary.com/bucha/image/upload/h_500/bg_gradient_fmgwrc')] bg-top bg-no-repeat bg-opacity-[0.3]" />
//             </div> */}

//             <Section className="z-50 mt-8">
//               <Img
//                 src={USER.image.profile}
//                 height="60"
//                 alt={USER.name}
//                 className="mx-auto my-0 rounded-full bg-white"
//               />

//               {children}

//               <Section className="z-50">
//                 <Img
//                   src="https://res.cloudinary.com/bucha/image/upload/c_thumb,q_40,h_100/signature-light_sbltch.png"
//                   height="40"
//                   alt={USER.name}
//                   className="my-0"
//                 />
//               </Section>
//             </Section>

//             {email && (
//               <Footer email={email} marketing={marketing} unsubscribe={false} />
//             )}
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// }
