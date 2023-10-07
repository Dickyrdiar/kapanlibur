/* eslint-disable no-unused-vars */
const List = ({Lists}) => {
  <div className="p-4 shadow-md rounded-lg">
    <h5 className="text-xl font-semibold mb-4">
      List Hari libur
    </h5>

    {Lists === null ? (
      <div className="text-lg font-semibold">Nothing holiday in this month</div>
    ) : (
      <ul>
        <li className="mb-2">
          <div className="text-lg font-semibold">Hari Natal</div>
          <div className="text-gray-600">25 Desember 2023</div>
        </li>
      </ul>
    )}
  </div>
}

export default List