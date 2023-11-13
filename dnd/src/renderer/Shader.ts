export class Shader
{
    private gl: WebGLRenderingContext;
    private program: WebGLProgram;

    constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string)
    {
        this.gl = gl;

        let program = this.createProgram(fragmentSource, vertexSource);
        if (program === null)
            this.program = new WebGLProgram();
        else
            this.program = program;
    }

    public bind()
    {
        this.gl.useProgram(this.program);
    }

    public unbind()
    {
        this.gl.useProgram(null);
    }

    private createProgram(vertexSource: string, fragmentSource: string): WebGLProgram | null
    {
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        const program = this.gl.createProgram();
        if (program === null || vertexShader === null || fragmentShader === null)
        {
            alert("Unable to create program!");
            return null;
        }
        
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        {
            alert("Unable to initialize program: " + this.gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    private loadShader(type: number, source: string): WebGLShader | null
    {
        const shader = this.gl.createShader(type);

        if (shader === null)
        {
            alert("Unable to create " + this.shaderTypeToString(type) + " shader!");
            return null;
        }

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            alert("An error occured compiling " + this.shaderTypeToString(type) + " shader: " + this.gl.getShaderInfoLog(shader));

            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    private shaderTypeToString(type: number): string
    {
        switch (type)
        {
            case this.gl.VERTEX_SHADER: return "vertex";
            case this.gl.FRAGMENT_SHADER: return "fragment";
            default: return "unknown";
        }
    }
}