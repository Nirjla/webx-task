import { cn } from "../../utils/utils";

export default function MaxWidthWrapper({ children, className }) {
      return (<>
            <div className={cn("p-7 sm:ml-64", className)}>{children && children}</div>
      </>)
}