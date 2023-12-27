import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import notif from "../../../public/assets/icons/notif.svg";
import { useToast } from "../ui/use-toast";

interface Notification {
  id: number;
  deliveryGuyName: string;
}

export const ShowDeliveryGuys = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, deliveryGuyName: "John Doe" },
    // Add more notifications as needed
  ]);

  const { toast } = useToast();

  const onDecline = (id: number) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  const onAccept = (id: number, deliveryGuyName: string) => {
    setOpen(false);
    toast({
      title: `${deliveryGuyName} is on his way!`,
      description: `${deliveryGuyName} will shortly be at your location to pick up the order.`,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        {open && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setOpen(false)}
            ></div>
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              {open && (
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col py-6 bg-[#020817] shadow-xl animate-slideIn">
                    {/* Sidebar Header */}
                    <div className="flex justify-end w-full items-center px-4">
                      <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 hover:text-gray-700 transition-transform duration-300 transform hover:scale-110"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="mx-4 font-bold">
                      Delivery Guys Available
                    </div>
                    <hr className="w-full h-1 mt-5" />
                    <div className="overflow-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex hover:bg-gray-500 hover:bg-opacity-40 hover:transition-all hover:delay-150 hover:ease-in-out justify-start items-center py-4"
                        >
                          <Avatar className="mr-5 ml-3 h-16 w-16 ">
                            <AvatarImage
                              className=""
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="ml-2 text-sm">
                              {" "}
                              <span className="font-bold">
                                {notification.deliveryGuyName}
                              </span>{" "}
                              is available for delivering
                            </p>
                            <div className="flex">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  onAccept(
                                    notification.id,
                                    notification.deliveryGuyName
                                  )
                                }
                                className="h-8 rounded-md mr-5 font-bold text-center"
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => onDecline(notification.id)}
                                className="h-8 rounded-md font-bold"
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <hr className="w-full h-1" />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        <img
          onClick={() => setOpen(true)}
          height={40}
          width={40}
          src={notif}
          alt=""
        />
      </div>
    </div>
  );
};
