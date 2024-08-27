import { useGetCategoriesQuery } from "../../api/productApi";
import CardWrapper from "./CardWrapper";
import SectionWrapper from "./SectionWrapper";
import SecondaryHeadline from "../common/SecondaryHeadline";

export default function SidebarWrapper({children}) {
      return (<>
            <div className='lg:col-span-2 md:col-span-4 '>
                  <SectionWrapper>
                        {children && children}
                  </SectionWrapper>
            </div>
      </>)
}