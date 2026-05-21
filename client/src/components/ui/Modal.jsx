//icons
import { X } from "lucide-react";

export default function Modal({ closeBtn, children, title }) {
  return (
    <div className="w-full h-full overflow-y-scroll bg-dark/50   dark:bg-black/70 fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 px-2 ">
      <div className="w-full max-w-[500px] rounded-xl h-auto  bg-light dark:bg-dark border dark:border-dark-border ">
        <div className="p-3 border-b-2 border-light-border dark:border-dark-border text-lg font-semibold text-light-primary dark:text-dark-primary flex justify-between item-center">
          <p>{title}</p>

          <X
            onClick={() => closeBtn(false)}
            className="cursor-pointer hover:text-light-primary/40 dark:hover:text-dark-primary/40"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
