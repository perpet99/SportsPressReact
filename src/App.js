import React, { useEffect, useState } from 'react';

function WordPressPosts() {
  const [result, setResult] = useState([]);


  useEffect(() => {
    handleGetStaff()

  }, []);

  const username = 'your account';
  const appPassword = 'your app password';
  const credentials = btoa(`${username}:${appPassword}`);
  const url = 'https://yourdomain/wp-json/sportspress/v2/staff'
  const handleGetStaff = () => {
    fetch(url,{
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }

    })
      .then(response => response.json())
      .then(data => {
        setResult(data)
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  const handleAddStaff = () => {
        
      const postData = {
      title: 'test',
      leagues: [4],
      status: 'publish'
    };

    fetch(url,{
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)

    })
      .then(response => {
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  })
  .then(data => {
    console.log('Post created successfully:', data);

    handleGetStaff()

  })
  .catch(error => {
    console.error('Error creating post:', error);
  });
  }
  const handleUpdatePost = (data) => {

    console.log('update click :', data);

    fetch(`${url}/${data.id}`,{
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    })
      .then(response => {
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  })
  .then(data => {
    console.log('Post created successfully:', data);
    handleGetStaff()
  })
  .catch(error => {
    console.error('Error creating post:', error);
  });

  };
  
  const handleDeletePost = (data) => {

    console.log('update click :', data);

    fetch(`${url}/${data.id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    })
      .then(response => {
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  })
  .then(data => {
    console.log('Post created successfully:', data);
    handleGetStaff()

  })
  .catch(error => {
    console.error('Error creating post:', error);
  });

  };

  const handleChange = (id, newTitle) => {
    setResult(prev =>
      prev.map(post =>
        post.id === id ? { ...post, title: newTitle } : post
      )
    );
  };

  return (
    <div>
      <h1>staff CRUD code</h1>
      <ul>
        {result.map(post => (
          <li 
          key={post.id}>
            <h2>title</h2>
            <input
                  type="text"
                  value={post.title.rendered}
                  onChange={e => handleChange(post.id, e.target.value)}
            />

            <h2>
            </h2>
    <button onClick={() => handleUpdatePost(post)}>
      Update
    </button>

    <button onClick={() => handleDeletePost(post)}>
      Delete
    </button>

          </li>

      ))}

      </ul>

      <button onClick={handleAddStaff}>
        add test staff
      </button>


      {/* <button onClick={handleGetStaff}>
        get staff list
      </button> */}




    </div>
  );
}

export default WordPressPosts;
