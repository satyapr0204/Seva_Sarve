import Header from "@/components/common/Header";
import ServiceViewDetail from "./ServiceViewDetail";

export default  function ServicePage(){

  return(
    <>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
            {/* <Header/> */}
            <ServiceViewDetail/>
          </div>
    </>
  )

}