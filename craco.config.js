// 参考文献：https://juejin.cn/post/6871148364919111688
const { whenDev, whenProd, when } = require('@craco/craco')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const postcssNormalize = require('postcss-normalize');

const path = require("path");

function pathResolve(dir) {
	return path.join(__dirname, dir);
}

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const isEnvDevelopment = whenDev;
const isEnvProduction = whenProd;

const getStyleLoaders = (cssOptions, preProcessor) => {
	const loaders = [
		isEnvDevelopment && require.resolve('style-loader'),
		isEnvProduction && {
			loader: MiniCssExtractPlugin.loader,
			options: paths.publicUrlOrPath.startsWith('.')
				? { publicPath: '../../' }
				: {},
		},
		{
			loader: require.resolve('css-loader'),
			options: cssOptions,
		},
		{
			loader: require.resolve('postcss-loader'),
			options: {
				ident: 'postcss',
				plugins: () => [
					require('postcss-flexbugs-fixes'),
					require('postcss-preset-env')({
						autoprefixer: {
							flexbox: 'no-2009',
						},
						stage: 3,
					}),
					postcssNormalize(),
				],
				sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
			},
		},
	].filter(Boolean);
	if (preProcessor) {
		loaders.push(
			{
				loader: require.resolve('resolve-url-loader'),
				options: {
					sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
					root: paths.appSrc,
				},
			},
			{
				loader: require.resolve(preProcessor),
				options: {
					sourceMap: true,
				},
			}
		);
	}
	return loaders;
};

module.exports = {
	
	// 设置babel
	babel: {
		presets: [
			[
				'@babel/preset-env',
				{
					modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
					useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
					corejs: {
						version: 3, // 使用core-js@3
						proposals: true,
					},
				}
			]
		]
	},
	// 这里都可以覆盖所有的webpack
	webpack: {
		/**
		 * 几乎所有的 webpack 配置均可以在 configure 函数中读取，然后覆盖
		 */
		configure: (webpackConfig, { env, paths }) => {
			// 修改 output
			webpackConfig.output = {
				...webpackConfig.output,
				...{
					filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
					chunkFilename: 'static/js/[name].js',
				},
			}
			// 配置扩展扩展名
			webpackConfig.resolve.extensions = [
				...webpackConfig.resolve.extensions,
				...['.scss', '.less', '.stylus'],
			]
			// 覆盖已经内置的 plugin 配置
			// webpackConfig.plugins.map((plugin) => {
			// 	whenProd(() => {
			// 	  if (plugin instanceof MiniCssExtractPlugin) {
			// 		Object.assign(plugin.options, {
			// 		  filename: 'static/css/[name].css',
			// 		  chunkFilename: 'static/css/[name].css',
			// 		})
			// 	  }
			// 	})
			// 	return plugin
			// })
			// 在craco 中的配置中，所有的css 打包都是在 rules 数组里边的某个对象的 oneOf数组中
			webpackConfig.module.rules.map(rule => {
				if(rule.oneOf && rule.oneOf.length) {
					rule.oneOf = [
						...rule.oneOf,
						{
							test: /\.(styl|stylus)$/,
							use: getStyleLoaders(
								{
									importLoaders: 3,
									sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
									modules: {
										getLocalIdent: getCSSModuleLocalIdent,
									},
								},
								'stylus-loader'
							),
						}
					]
				}
				return rule
			})
			return webpackConfig
		},
		// 设置别名如果是使用了 typescript 那还要在tsconfig.json 里边配置
		alias: {
			'@': pathResolve('src')
		},
		devServer: {
			port: 8080,
			proxy: {
				'/api': {
				target: 'http://127.0.0.1:3000',
				// target: 'https://xwzyyds.com/',
				changeOrigin: true,
				secure: false,
				xfwd: false,
				}
			}
		}
	}
}