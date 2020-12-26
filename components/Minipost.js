import Link from '../src/Link';
import { time_diff } from '../src/myAPI';

const Minipost = (props) => {
  const address = "/posts/" + props.id.toString();
  var today = new Date();
  var postday = new Date(props.time);
  var [days,hours,minutes,seconds] = time_diff(today,postday);
  return (
    <div className="col-4">
      <div className="card-deck">
        <div className="card">
          <Link href={address}><img className="card-img-top" src="http://placehold.it/800x400" alt="Card image cap" /></Link>
          <div className="card-body">
            <Link href={address} className="card-title">{props.title}</Link>
            <p className="card-text">{props.summary}</p>
            <p className="card-text"><small className="text-muted">Last updated {days} days, {hours} hours, {minutes} mins, {seconds} seconds ago</small></p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Minipost;
