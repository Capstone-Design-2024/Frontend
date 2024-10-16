// import {
//   List,
//   ListItem,
//   ListItemPrefix,
//   Avatar,
//   Card,
//   Typography,
// } from "@material-tailwind/react";
// import logo from "../../assets/itemizeLogo.png";
// import React, { useEffect, useState } from "react";
// import ERC20Contract from "../../contract/ERC20Contract";

// const token = localStorage.getItem("token");
// const getPrKey = () => localStorage.getItem("private_key");

// export default function ListWithAvatar({ project, walletAddress }) {
//   const [projectCard, setProjectCard] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const erc20Contract = await ERC20Contract.getInstance();
//         const result = await erc20Contract.getUserProjects(getPrKey());
//         setProjectCard(result);
//       } catch (error) {
//         console.error("Error fetching project cards:", error);
//       }
//     };

//     fetchData();  // 비동기 함수를 호출
//   }, []);  // 필요한 의존성 배열 추가

//   return (
//     <Card className="w-full p-2 bg-white/85 shadow-2xl">
//       <List>
//         <p className="text-xl text-gray-800 font-medium pl-4 mt-2">Tickets</p>
//         <ListItem>
//           <ListItemPrefix>
//             <Avatar variant="circular" alt="logo" src={logo} />
//           </ListItemPrefix>
//           <div>
//             <Typography variant="h6" color="blue-gray">
//               {project ? project.title : "Test Product"}
//             </Typography>
//             <div className="flex justify-start gap-1">
//               <Typography variant="small" color="gray" className="font-normal">
//                 From
//               </Typography>
//               <Typography
//                 variant="small"
//                 className="font-normal text-purple-700"
//               >
//                 {walletAddress
//                   ? walletAddress
//                   : "A94A8FE5CCB19BA61C4C0873D391E987982FBBD3"}
//               </Typography>
//             </div>
//           </div>
//         </ListItem>
//       </List>
//     </Card>
//   );
// }

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button, // 버튼 추가
} from "@material-tailwind/react";
import logo from "../../assets/itemizeLogo.png";
import React, { useState } from "react"; // useEffect 제거

export default function ListWithAvatar({ walletAddress, ticket, loading }) {
  console.log(ticket);

  // const fetchProjectCard = async () => {
  //   try {

  //     const erc20Contract = await ERC20Contract.getInstance();
  //     const result = await erc20Contract.getUserProjects(getPrKey());
  //     const cards = [];
  //     if (result.split(",").length != 0) {
  //       console.log(result)
  //       for await (const pid of result.split(",")) {
  //         const tokenURI = await erc20Contract.getTokenURI(parseInt(pid));
  //         const data = {
  //           tokenURI: tokenURI
  //         };

  //         const response = await axios.post(`${API.TOKENRESOLVE}`, data, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${token}`,
  //           }
  //         });

  //         const responseData = response.data.data

  //         const cardData = {
  //           name: responseData.name,
  //           image: responseData.image,
  //           description: responseData.description,
  //           price: responseData.attributes[0]["value"],
  //           uri: tokenURI
  //         };

  //         cards.push(cardData);
  //       }
  //       setProjectCard(cards);
  //     } else {
  //       setProjectCard(cards);
  //     }

  //   } catch (error) {
  //     console.error("Error fetching project cards:", error);
  //   }
  // };

  return (
    <Card className="w-full bg-white/85 p-4 shadow-2xl">
      <List className="max-h-[300px] overflow-y-auto">
        <p className="mt-2 pl-4 text-xl font-medium text-gray-800">NFTs</p>
        {loading ? (
          <ListItem className="cursor-pointer">
            <ListItemPrefix>
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-400" />
            </ListItemPrefix>
            <div className="space-y-1">
              <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
              <div className="flex justify-start gap-1">
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
              </div>
              <div className="flex justify-start gap-1">
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
              </div>
            </div>
          </ListItem>
        ) : ticket.length === 0 ? (
          <Typography variant="small" color="gray" className="pl-4">
            You don't have ticket yet!
          </Typography>
        ) : (
          ticket.map((proj, index) => (
            <ListItem
              key={index}
              onClick={() => window.open(`${proj.uri}`, "_blank")} // 새 창에서 IPFS 링크 열기
              className="cursor-pointer"
            >
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt="logo"
                  src={proj.image ? proj.image : logo}
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {proj.name ? proj.name : "Test Product"}
                </Typography>
                <div className="flex justify-start gap-1">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Description:
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-purple-700"
                  >
                    {proj.description
                      ? proj.description
                      : "No description available"}
                  </Typography>
                </div>
                <div className="flex justify-start gap-1">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Price:
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-purple-700"
                  >
                    {proj.price ? proj.price : "0"}
                  </Typography>
                </div>
              </div>
            </ListItem>
          ))
        )}
      </List>
    </Card>
  );
}
