/* eslint-disable no-unused-vars */
const List = ({Lists}) => {
  <div className="p-4 shadow-md rounded-lg">
    <h5 className="text-xl font-semibold mb-4">
      List Hari libur
    </h5>

    {Lists === null ? (
      <div className="text-lg font-semibold">Nothing holiday in this month</div>
    ) : (
      <div className="container px-5 py-24 max-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">Hari Natal</h2>
                <p class="leading-relaxed">25 - Desember - 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
}

export default List