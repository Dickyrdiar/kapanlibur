const List = ({items}) => {
  <div className="mx-auto max-w-md">
    <ul className="bg-white border-rounded-md shadow-md">
      {items.map((item, index) => {
        <li 
          key={index}
          className={`px-4 py-3 border-b ${index === item.length - 1 ? '' : 'border-group-200'}`}
        >
          {item}
        </li>
      })}
    </ul>
  </div>
}

export default List