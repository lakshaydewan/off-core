export interface Plugin {
  id: string;
  name: string;
  description?: string;

  // Replaces the entire products page content below the nav with an iframe
  // pointing to the plugin team's independently deployed app.
  PageOverride?: React.FC;
}
