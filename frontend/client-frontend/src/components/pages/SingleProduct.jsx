import { useParams } from "react-router-dom"
import ContainerWrapper from "../wrapper/ContainerWrapper"

export default function SingleProduct() {
      const { id } = useParams()
      console.log("Id", id)
      return (<>
      <ContainerWrapper>
            
      </ContainerWrapper>
      </>)
}