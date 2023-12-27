import { OrderQueue } from "@/components/shared/OrderQueue";
import { ShowDeliveryGuys } from "@/components/shared/ShowDeliveryGuys";
import { TaskAssign } from "@/components/shared/TaskAssign";
import { Button } from "@/components/ui/button";
import { BookDown, MapPin } from "lucide-react";

const deliveryGuyName = "Joe Doe";
const deliveryGuyPh = " +91 XXXXX XXXXX";
const deliveryGuyAdd = " 45, brooklyn Streets New york";
const deliveryGuyTotal = "250";
const deliveryGuyToday = "12";
const deliveryGuyAvg = " 21";
const deliveryGuyRatings = "4.7";
const deliveryGuyReviews = "79";

export const DeliveryProfilePage = () => {
  return (
    <div className="w-full max-w-[95%] mx-auto my-8 sm:w-[35%] ">
      <ShowDeliveryGuys />
      <TaskAssign />
      <OrderQueue />
      <div className="flex flex-col justify-center gap-2 items-center bg-[#485882] bg-opacity-20 p-5 rounded-xl">
        <div className="relative me-4">
          <img
            className="w-16 h-16 rounded-full"
            src="https://github.com/shadcn.png"
            alt="profile image"
          />
          <span className="top-0 start-12 absolute w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div className="flex justify-center items-center text-center">
          <p className=" text-[18px] font-bold">{deliveryGuyName}</p>
          <div className="mx-3 h-6 w-0.5 bg-white"></div>
          <a
            href="tel:55555555"
            className="text-[14px] z-0 text-white-500 opacity-60"
          >
            {deliveryGuyPh}
          </a>
        </div>
        <div className="flex justify-center  items-center text-xs">
          <div className="flex justify-center items-center mx-1">
            <div className="h-2 w-2 mx-1 border-white dark:border-gray-800 rounded-full bor bg-green-500 "></div>
            <p className="italic ">Currently Delivering</p>
          </div>
          <div className="flex justify-center items-center mx-1">
            <div className="h-2 w-2 mx-1 border-white dark:border-gray-800 rounded-full bor bg-red-500 "></div>
            <p className="italic ">Idle</p>
          </div>
        </div>
      </div>
      <hr className="w-full mt-5 mb-5 border-[#cad2c5] border-opacity-50 " />
      <div className=" flex flex-col justify-center bg-[#485882] bg-opacity-20 rounded-xl items-center mx-auto">
        <div className="text-xl font-bold my-5 underline">
          Delivery Person Details
        </div>
        <div className="flex justify-center items-center  text-sm text-center">
          <MapPin className="mr-2" />
          {deliveryGuyAdd}
        </div>
        <div className="w-full px-4 text-center">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase text-center tracking-wide text-blueGray-600">
                {deliveryGuyTotal}
              </span>
              <span className="text-sm  text-blueGray-400">Total</span>
            </div>
            <div className="mx-3 h-16 w-0.5 bg-[#cad2c5]"></div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {deliveryGuyToday}
              </span>
              <span className="text-sm text-blueGray-400 text-center">
                Today
              </span>
            </div>
            <div className="mx-3 h-16 w-0.5 bg-[#cad2c5]"></div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {deliveryGuyAvg}
              </span>
              <span className="text-sm text-blueGray-400">Average</span>
            </div>
          </div>
        </div>
        <div className="flex items-center my-2 mb-4">
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
            {deliveryGuyRatings}
          </p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            {deliveryGuyReviews} reviews
          </a>
        </div>
      </div>
      <Button
        variant="outline"
        type="submit"
        className="mt-4 px-6 text-xl font-bold"
      >
        <BookDown className="mr-3" />
        Book Now
      </Button>
    </div>
  );
};
