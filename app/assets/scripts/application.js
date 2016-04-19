// This file is the only file that gets called by the initial page load.
function Application() {

	function init() {
		var path = window.location.pathname.split('/');
		path.shift();
		load_path_code(path);
	}

	function load_path_code(path) {
		/**
		 * So what we do here, we check the PageHandlers for the directory path
		 * and then we load any of them available, starting at the root level
		 * and working downward.
		 *
		 * They're automatically wrapped in closures and attached to the global
		 * PageHandler object by Flask because they're in the scripts/pages
		 * directory.
		 */
		var prev_paths = [];
		path.forEach(function(p) {
			prev_paths.push(p.toLowerCase());
			var cur_path = prev_paths.join('/');
			if (PageHandlers[cur_path]) {
				PageHandlers[cur_path]();
			}
		});
	}

	init();

}