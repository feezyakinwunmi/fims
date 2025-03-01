// import { clsx } from "clsx";
// import React from "react";
// import { TbAlertCircle } from "react-icons/tb";

// interface ErrorDisplayProps {
//   message: (string | undefined)[];
//   icon?: React.ReactNode;
//   orientation?: "horizontal" | "vertical";
// }

// export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
//   message,
//   icon,
//   orientation = "horizontal",
// }) => {
//   return (
//     <div className="w-full">
//       {message.length > 0 && (
//         <div className="w-full flex flex-col gap-3">
//           {message.map((text, i) => (
//             <div
//               key={i}
//               className={clsx(
//                 "flex items-center gap-3 p-4 bg-eweko_error_bgcolor text-eweko_red rounded-[4px]",
//                 {
//                   "flex-row": orientation === "horizontal",
//                   "flex-col text-center": orientation === "vertical",
//                 },
//               )}
//             >
//               {icon ? (
//                 <span className="mr-3 text-2xl w-[5%]">{icon}</span>
//               ) : (
//                 <TbAlertCircle className="text-2xl w-[5%]" />
//               )}
//               <p className="w-[95%]">{text}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };




import { clsx } from "clsx";
import React from "react";
import { TbAlertCircle } from "react-icons/tb";

interface ErrorDisplayProps {
  message: (string | undefined)[];
  icon?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  icon,
  orientation = "horizontal",
}) => {
  // Ensure message is always an array (this acts as a fallback)
  const messages = Array.isArray(message) ? message : [message];

  return (
    <div className="w-full">
      {messages.length > 0 && (
        <div className="w-full flex flex-col gap-3">
          {messages.map((text, i) => (
            <div
              key={i}
              className={clsx(
                "flex items-center gap-3 p-4 bg-eweko_error_bgcolor text-eweko_red rounded-[4px]",
                {
                  "flex-row": orientation === "horizontal",
                  "flex-col text-center": orientation === "vertical",
                },
              )}
            >
              {icon ? (
                <span className="mr-3 text-2xl w-[5%]">{icon}</span>
              ) : (
                <TbAlertCircle className="text-2xl w-[5%]" />
              )}
              <p className="w-[95%]">{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
