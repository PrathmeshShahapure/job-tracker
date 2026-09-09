import { useEffect, useState } from "react";
import api from "../api/axios.js";
import TableRow from "../components/TableRow";

const Home = () => {
  const [applications, setApplications] = useState([]);
  const [iserr, setIserr] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("req made");
        const result = await api.get("/api/applications", {
          params: { search: debounceSearch, status: filter, sort: sort },
        });
        const data = result?.data?.data;
        setApplications(data);
        setLoading(false);
      } catch (error) {
        setIserr(true);
        setLoading(false);
        console.log(error.response);
      }
    };

    fetchData();
  }, [debounceSearch, filter, sort]);

  

  return (
    <div className="font-comic ">
      <div className="my-5">
        <h1 className="text-center text-3xl">My Applications</h1>
        <section className="mt-20 flex justify-between">
          <input
            className="h-7 w-100 p-1 border rounded  outline-none "
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="space-x-4 ">
            {/* filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-auto outline-pink-300 border  border-pink-200 rounded"
            >
              <option value="">All</option>
              {["Applied", "Interview", "Offer", "Rejected", "Withdrawn"].map(
                (sf) => (
                  <option key={sf} value={sf}>
                    {sf}{" "}
                  </option>
                ),
              )}
            </select>

            <select
              onChange={(e) => setSort(e.target.value)}
              value={sort}
              className="w-auto border outline-red-300  border-red-200 rounded"
            >
              <option value="">Sr No</option>
              {["company_name", "job_title", "status"].map((sf) => (
                <option key={sf} value={sf}>
                  {sf}
                </option>
              ))}
            </select>
          </div>
        </section>
        <table className="mt-8  w-full">
          <thead>
            <tr className="">
              <th>ID</th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Location</th>
              <th>Notes</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center mt-30">
                    <div className="h-10 w-10 rounded-full border-2 border-t-0 animate-spin border-amber-300" />
                  </div>
                </td>
              </tr>
            ) : iserr ? (
              <p> Fails to Fetch try again </p>
            ) : applications.length == 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No applications yet
                </td>
              </tr>
            ) : (
              applications.map((app) => <TableRow key={app.id} app={app} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
