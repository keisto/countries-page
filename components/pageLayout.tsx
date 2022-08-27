import NavBar from './navBar'

const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}

export default PageLayout
