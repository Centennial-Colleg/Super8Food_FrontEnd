import { useState, useEffect } from 'react';
import { list } from '../datasource/api-history';

function History() {
    let [historyList, setHistoryList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadHistory = () => {
        list()
            .then((res) => {
                if (res.success) {
                    setHistoryList(res.data);
                    setIsLoading(false);
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>My History</h1>

            <br /><br />

            <div className="table-responsive">
                {isLoading && <div>Loading...</div>}
                {!isLoading && historyList.length === 0 && <div>No history found.</div>}

                {!isLoading && historyList.length > 0 &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Description</th>
                                <th className="text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyList.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default History;