import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import { AuthContext } from '../context/auth';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
export default function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Quotes</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}
