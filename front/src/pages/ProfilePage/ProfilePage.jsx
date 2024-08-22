import { Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
    return(<>
    <div className="admin-page-buttons">
        <div>
            <h2>Profile console</h2>
        </div>
        <div>
          <Link to="/categories">
            <button type="button" className="btn btn-primary">
              Edit Categories
            </button>
          </Link>
        </div>
        <div>
          <Link to="/editAdversement">
            <button type="button" className="btn btn-primary">
              Add Advertisement
            </button>
          </Link>
        </div>
      </div>
    </>
    );
}

export default ProfilePage;