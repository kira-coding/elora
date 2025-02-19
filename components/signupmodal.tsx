'use client'
import { UserRoundPlus } from 'lucide-react'
import React from 'react'
import SignUp from './sign-up'

function Signupmodal() {
    return (
        <div>
{/* The button to open modal */}
<label htmlFor="my_modal_7" className="btn"><UserRoundPlus size={16} color="#dc8add" strokeWidth={1.25} /></label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Add Another Administrator!</h3>
    <SignUp></SignUp>
  </div>
  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div>
</div>
    )
}

export default Signupmodal