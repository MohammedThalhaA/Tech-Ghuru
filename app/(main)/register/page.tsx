import Link from 'next/link';

export default function Page() {
  return (
    <>
      <link href="/css/style12.css" rel="stylesheet" />
      <div className="signup-form">
        <form action="/api/register" method="post">
          <h2>Register</h2>
          <p className="hint-text">Create your account</p>
          <div className="form-group">
            <div className="row">
              <div className="col"><input className="form-control" name="first_name" placeholder="First Name" required type="text"/></div>
              <div className="col"><input className="form-control" name="last_name" placeholder="Last Name" required type="text"/></div>
            </div>
          </div>
          <div className="form-group">
            <input className="form-control" name="email" placeholder="Email" required type="email"/>
          </div>
          <div className="form-group">
            <input className="form-control" name="pass" placeholder="Password" required type="password"/>
          </div>
          <div className="form-group">
            <input className="form-control" name="cpass" placeholder="Confirm Password" required type="password"/>
          </div>
          <div className="form-group">
            <label className="form-check-label"><input required type="checkbox"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-lg btn-block" name="save" type="submit">Register Now</button>
          </div>
          <div className="text-center">Already have an account? <Link href="/login">Sign in</Link></div>
        </form>
      </div>
    </>
  );
}
