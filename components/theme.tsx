import { Paintbrush } from 'lucide-react'
import React from 'react'

function Theme() {
  return (
    <div className="dropdown  dropdown-left text-accent-content">
    <div tabIndex={0} role="button" className="btn btn-ghost  p-0 m-0">
      <Paintbrush size={14} fontWeight={"bold"} ></Paintbrush>

    </div>
    <ul tabIndex={0} className="dropdown-content bg-base-300  rounded-box z-[1] w-52 p-2 shadow-2xl">
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Default"
          value="default" />
      </li>
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="luxury"
          value="luxury" />
      </li>

      <li>
        <input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="cupcake"
          value="cupcake" />
      </li>

    </ul>
  </div>
  )
}

export default Theme