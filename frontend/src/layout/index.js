import Footer from "../container/footer";
import Header from "../container/header";

function Layout({children}) {
  
  return (
    <>
        <Header></Header>
        {children}
        {/* <Footer></Footer> */}
    </>
  );
}

export default Layout;
