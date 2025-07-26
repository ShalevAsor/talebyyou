import {
  FaBookOpen,
  FaCheck,
  FaEye,
  FaFileDownload,
  FaImage,
  FaPalette,
  FaPencilAlt,
  FaShoppingCart,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { FiPrinter, FiType } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";

export const howItWorksSteps = [
  {
    id: 1,
    title: "Choose a Book",
    description:
      "Select a story from our curated collection of templates that best suits your child's interests.",
    icon: <FaBookOpen className="h-6 w-6" />,
    illustration: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative w-48 h-64">
          {/* Book stack */}
          <div className="absolute top-0 left-0 w-40 h-56 bg-purple-200 rounded-md transform rotate-[-15deg]"></div>
          <div className="absolute top-0 left-4 w-40 h-56 bg-indigo-300 rounded-md transform rotate-[-5deg]"></div>
          <div className="absolute top-0 left-8 w-40 h-56 bg-white border-2 border-indigo-200 rounded-md shadow-md flex flex-col p-4">
            <div className="w-full h-6 bg-indigo-100 rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-indigo-100 rounded mb-4"></div>
            <div className="flex-1 flex items-center justify-center">
              <FaStar className="h-16 w-16 text-indigo-400" />
            </div>
            <div className="w-full h-4 bg-indigo-100 rounded mt-2"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Personalize",
    description:
      "Add your child's name, photo, and customize the details to make the book special and unique to them.",
    icon: <FaPencilAlt className="h-6 w-6" />,
    illustration: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="w-64 h-48 bg-white rounded-lg shadow-md border border-indigo-200 p-4">
          <div className="flex space-x-4 mb-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <FaUser className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-6 w-full bg-indigo-100 rounded"></div>
              <div className="h-4 w-3/4 bg-indigo-100 rounded"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaUser className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="h-6 w-3/4 bg-indigo-100 rounded"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaImage className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="h-6 w-3/4 bg-indigo-100 rounded"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FiType className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="h-6 w-3/4 bg-indigo-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Preview and Customize",
    description:
      "See how your custom book will look in real-time. You can edit the title, text, images, and even add dedications or personal messages.",
    icon: <FaEye className="h-6 w-6" />,
    illustration: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative w-64 h-48">
          {/* Book preview */}
          <div className="absolute top-0 left-0 w-48 h-40 bg-white border-2 border-indigo-200 rounded-md shadow-md flex flex-col p-3">
            <div className="w-full h-4 bg-indigo-100 rounded mb-2"></div>
            <div className="flex-1 flex items-center justify-center">
              <IoSparkles className="h-12 w-12 text-indigo-400" />
            </div>
            <div className="w-full h-3 bg-indigo-100 rounded mt-1"></div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-100 rounded-lg p-3 flex flex-col space-y-2">
            <div className="h-6 w-full bg-white rounded flex items-center px-2">
              <div className="h-3 w-3 rounded-full bg-indigo-400 mr-2"></div>
              <div className="h-3 w-16 bg-indigo-200 rounded"></div>
            </div>
            <div className="h-6 w-full bg-white rounded flex items-center px-2">
              <div className="h-3 w-3 rounded-full bg-indigo-400 mr-2"></div>
              <div className="h-3 w-12 bg-indigo-200 rounded"></div>
            </div>
            <div className="h-6 w-full bg-white rounded flex items-center px-2">
              <div className="h-3 w-3 rounded-full bg-indigo-400 mr-2"></div>
              <div className="h-3 w-20 bg-indigo-200 rounded"></div>
            </div>
            <div className="h-6 w-full bg-indigo-500 rounded"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Place Your Order",
    description:
      "Once you're happy with your customizations, simply place your order and get ready for a magical book made just for you!",
    icon: <FaShoppingCart className="h-6 w-6" />,
    illustration: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="w-64 h-48 bg-white rounded-lg shadow-md border border-indigo-200 p-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-100">
            <div className="flex items-center">
              <FaShoppingCart className="h-6 w-6 text-indigo-500 mr-2" />
              <div className="text-lg font-bold text-indigo-600">Checkout</div>
            </div>
            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaCheck className="h-4 w-4 text-indigo-500" />
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="h-4 w-full bg-indigo-100 rounded"></div>
            <div className="h-4 w-3/4 bg-indigo-100 rounded"></div>
            <div className="h-4 w-5/6 bg-indigo-100 rounded"></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="h-3 w-16 bg-indigo-100 rounded"></div>
              <div className="h-5 w-20 bg-indigo-200 rounded font-bold"></div>
            </div>
            <div className="h-10 w-28 bg-indigo-500 rounded-md flex items-center justify-center">
              <div className="h-3 w-16 bg-white rounded opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Create and Edit",
    description:
      "After you place your order, we'll create the remaining images for your book. You can continue to make edits until you're completely satisfied. When you're ready, you can either send your book for printing or download it as an eBook.",
    icon: <FaPalette className="h-6 w-6" />,
    illustration: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative w-64 h-48">
          {/* Book */}
          <div className="absolute top-4 left-4 w-40 h-40 bg-white border-2 border-indigo-200 rounded-md shadow-md flex items-center justify-center">
            <IoSparkles className="h-16 w-16 text-indigo-400" />
          </div>

          {/* Options */}
          <div className="absolute bottom-0 right-0 w-36 h-28 bg-indigo-100 rounded-lg p-3 flex flex-col space-y-3">
            <div className="h-8 w-full bg-white rounded flex items-center px-2">
              <FiPrinter className="h-4 w-4 text-indigo-500 mr-2" />
              <div className="h-3 w-12 bg-indigo-200 rounded"></div>
            </div>
            <div className="h-8 w-full bg-white rounded flex items-center px-2">
              <FaFileDownload className="h-4 w-4 text-indigo-500 mr-2" />
              <div className="h-3 w-16 bg-indigo-200 rounded"></div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
            <FaCheck className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>
    ),
  },
];
