export default abstract class WidgetBase {
    public abstract load(): void;
    public abstract resize(): void;
    public abstract render(): void;
    public abstract tick(): void;
}