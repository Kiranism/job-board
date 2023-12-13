import Modal from "../form/Modal";

export default function Navbar() {
  return (
    <div className="relative w-full bg-white px-4">
      <div className="mx-auto flex  items-center justify-between py-2">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold text-2xl">Logo</span>
        </div>
        <div className="block">
          <Modal />
        </div>
      </div>
    </div>
  );
}
