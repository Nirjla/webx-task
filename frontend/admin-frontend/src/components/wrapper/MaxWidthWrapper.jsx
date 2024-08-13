import { cn } from "../../utils/utils";

export default function MaxWidthWrapper({ children, className }) {
      return (<>
            <div className={cn("container p-2", className)}>{children && children}</div>
      </>)
}