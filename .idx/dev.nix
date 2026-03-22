{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
  ];
  idx = {
    extensions = [
      "angular.ng-template",
      "vscode.typescript-language-features",
      "dbaeumer.vscode-eslint"
    ];
    workspace = {
      onCreate = {
        npm-install = "cd travel-planner && npm install --legacy-peer-deps";
      };
    };
    previews = {
      enable = true,
      previews = {
        web = {
          command = ["sh" "-c" "cd travel-planner && npm run start -- --port $PORT --host 0.0.0.0 --disable-host-check"];
          manager = "web";
        };
      };
    };
  };
}
