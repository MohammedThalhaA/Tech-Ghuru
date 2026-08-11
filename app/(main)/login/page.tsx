import Link from 'next/link';

export default function Page() {
  return (
    <>
      <link href="/css/style1.css" rel="stylesheet" />
      <div className="signup-form">
        <form action="/api/login" method="post">
          <h2>Login</h2>
          <p className="hint-text">Enter Login Details</p>
          <div className="form-group">
            <input className="form-control" name="email" placeholder="Email" required type="email"/>
          </div>
          <div className="form-group">
            <input className="form-control" name="pass" placeholder="Password" required type="password"/>
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-lg btn-block" name="submit" type="submit">Login</button>
          </div>
          <div className="text-center">Don&apos;t have an account? <Link href="/register">Register Here</Link></div>
        </form>
      </div>
    </>
  );
}
