import { cn } from "../../utils/utils";

export default function GridWrapper({ children, className }) {
      return (<>
            <div className={cn("grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-12 gap-x-7 gap-y-7", className)}>{children}</div>
      </>)
}