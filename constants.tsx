
import { ApiDoc } from './types';

export const INITIAL_API_DATA: ApiDoc = {
  title: "Nexus Core API",
  version: "v2.4.0",
  description: "The official API for the Nexus Ecosystem, providing robust interfaces for authentication, data processing, and enterprise resource management.",
  baseUrl: "https://api.nexus-cloud.com/v2",
  categories: [
    {
      name: "Authentication",
      endpoints: [
        {
          id: "auth-login",
          method: "POST",
          path: "/auth/login",
          summary: "Generate access token",
          description: "Authenticates a user and returns a JSON Web Token (JWT) along with user profile metadata.",
          parameters: [
            { name: "email", type: "string", required: true, description: "User's registered email address", location: "body" },
            { name: "password", type: "string", required: true, description: "Plain text password", location: "body" }
          ],
          responses: [
            { status: 200, description: "Successful authentication", schema: JSON.stringify({ token: "eyJhbGci...", user: { id: "usr_123", name: "John Doe" } }, null, 2) },
            { status: 401, description: "Invalid credentials", schema: JSON.stringify({ error: "Unauthorized", message: "Invalid email or password" }, null, 2) }
          ],
          category: "Authentication"
        },
        {
          id: "auth-refresh",
          method: "POST",
          path: "/auth/refresh",
          summary: "Refresh access token",
          description: "Extends the user's session by providing a new access token using a valid refresh token.",
          parameters: [
            { name: "refresh_token", type: "string", required: true, description: "The persistent refresh token", location: "body" }
          ],
          responses: [
            { status: 200, description: "New token generated", schema: JSON.stringify({ token: "eyJhbGci..." }, null, 2) }
          ],
          category: "Authentication"
        }
      ]
    },
    {
      name: "Users",
      endpoints: [
        {
          id: "users-list",
          method: "GET",
          path: "/users",
          summary: "List all users",
          description: "Returns a paginated list of users within the organization workspace.",
          parameters: [
            { name: "limit", type: "integer", required: false, description: "Number of records to return", location: "query" },
            { name: "offset", type: "integer", required: false, description: "Number of records to skip", location: "query" }
          ],
          responses: [
            { status: 200, description: "List of users", schema: JSON.stringify([{ id: "u_1", name: "Alice" }, { id: "u_2", name: "Bob" }], null, 2) }
          ],
          category: "Users"
        },
        {
          id: "users-get",
          method: "GET",
          path: "/users/{userId}",
          summary: "Retrieve a specific user",
          description: "Fetches detailed information about a specific user identified by their unique ID.",
          parameters: [
            { name: "userId", type: "string", required: true, description: "Unique identifier for the user", location: "path" }
          ],
          responses: [
            { status: 200, description: "User details", schema: JSON.stringify({ id: "usr_123", name: "John Doe", email: "john@example.com" }, null, 2) },
            { status: 404, description: "User not found", schema: JSON.stringify({ error: "Not Found", message: "User ID does not exist" }, null, 2) }
          ],
          category: "Users"
        }
      ]
    },
    {
      name: "Analytics",
      endpoints: [
        {
          id: "analytics-events",
          method: "POST",
          path: "/analytics/events",
          summary: "Track custom event",
          description: "Records a custom telemetry event for business intelligence analysis.",
          parameters: [
            { name: "event_name", type: "string", required: true, description: "The name of the event", location: "body" },
            { name: "properties", type: "object", required: false, description: "Additional metadata for the event", location: "body" }
          ],
          responses: [
            { status: 202, description: "Event queued for processing", schema: JSON.stringify({ status: "queued", event_id: "evt_99" }, null, 2) }
          ],
          category: "Analytics"
        }
      ]
    }
  ]
};
