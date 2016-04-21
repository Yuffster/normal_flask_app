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
		 * and then we load the first one that's available, starting at the
		 * bottom level and working upwards.
		 *
		 * They're automatically wrapped in closures and attached to the global
		 * PageHandler object by Flask because they're in the scripts/pages
		 * directory.
		 */
		var path_list = [];
		var prev_paths = [];
		path.forEach(function(p) {
			prev_paths.push(p.toLowerCase());
			path_list.push(prev_paths.join('/'))
		});
		path_list.reverse();
		for (var p in path_list) {
			if (PageHandlers[path_list[p]]) {
				PageHandlers[path_list[p]]();
				break;
			}
		}
	}

	init();

}