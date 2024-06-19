import React from 'react'


const Nav = () => {
  return (
    <header className="body-font text-white items-center">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center ">
                <a className="mr-5 cursor-pointer" >Generar Ticket</a>
                <a className="mr-5 cursor-pointer" >Ver estadisticas</a>
            </nav>
        </div>
    </header>
  )
}

export default Nav