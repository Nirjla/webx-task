export default function SectionWrapper({ children }) {
      return (<>
            <div className='py-5'>{children && children}</div>
      </>)
}