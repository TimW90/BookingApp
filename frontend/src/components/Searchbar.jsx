

const SearchBar = () => (

<div className="flex w-full">
<div className="dropdown">
  <div tabIndex={0} role="button" className="btn w-96 m-1">City:</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
  <div className="divider divider-horizontal"></div>
  <div className="grid h-15 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
  <div className="divider divider-horizontal"></div>
  <div className="grid h-15 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
  <div className="divider divider-horizontal"></div>
  <div button className="btn">Button</div>
</div>





)

export default SearchBar